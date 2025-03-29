<template>
    <div>
        <v-form ref="form">
            <v-card class="pa-10 bg-white rounded">
                <div class="d-flex justify-space-between mb-3">
                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Quốc gia</div>
                        <v-text-field density="compact" variant="outlined" readonly>Viet Nam</v-text-field>
                    </div>

                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Tỉnh/ TP</div>
                        <v-select
                            v-model="cityId"
                            :items="cities"
                            item-value="id"
                            item-title="full_name"
                            density="compact"
                            :rules="selectRule"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>
                </div>

                <div class="d-flex justify-space-between mb-3">
                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Quận/ Huyện</div>
                        <v-select
                            v-model="districtId"
                            :items="districts"
                            item-value="id"
                            item-title="full_name"
                            density="compact"
                            :rules="selectRule"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>

                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Phường/ xã</div>
                        <v-select
                            v-model="wardId"
                            :items="wards"
                            item-value="id"
                            item-title="full_name"
                            density="compact"
                            :rules="selectRule"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>
                </div>

                <div class="mb-3">
                    <div class="text-subtitle-1 text-medium-emphasis">Địa chỉ cụ thể</div>
                    <v-text-field density="compact" :placeholder="$t('product.name')"
                        variant="outlined">
                        <template v-slot:append-inner>
                            <span class="text-note">1/100</span>
                        </template>
                    </v-text-field>
                </div>

                <div class="d-flex w-100 justify-end">
                    <v-btn style="width: 20%;" color="blue" type="submit">Lưu</v-btn>
                </div>
            </v-card>
        </v-form>
    </div>
</template>

<script>
import { RequiredRule, BirthdayRule, FileRule, RadioRule, SelectRule } from '@/rules/Rule';
import AddressApi from '@/services/api/AddressApi';

export default {
    data: () => ({
        address: {
            country: 'Viet Name',
            city: null,
            district: null,
            ward: null,
            specific_address: null
        },
        cities: [],
        districts: [],
        wards: [],
        countryId: null,
        cityId: null,
        districtId: null,
        wardId: null
    }),

    computed: {
        selectRule() {
            return SelectRule(this.$t);
        }
    },

    watch: {
        cityId(newValue, oldValue) {
            this.districtId = null;
            this.wardId = null;
            this.wards = [];
            this.fetchDistrict();
        },

        districtId(newValue, oldValue) {
            this.wardId = null;
            this.fetchWard();
        }
    },

    mounted() {
        this.fetchCity();
    },

    methods: {
        async fetchCity() {
            const response = await AddressApi.getAllCities();
            if(response.status === 200) {
                const data = response.data;
                this.cities = data.data;
            }
        },

        async fetchDistrict() {
            const response = await AddressApi.getAllDistricts(this.cityId);
            if(response.status === 200) {
                const data = response.data;
                this.districts = data.data;
            }
        },

        async fetchWard() {
            const response = await AddressApi.getAllWards(this.districtId);
            if(response.status === 200) {
                const data = response.data;
                this.wards = data.data;
            }
        }
    }
}
</script>