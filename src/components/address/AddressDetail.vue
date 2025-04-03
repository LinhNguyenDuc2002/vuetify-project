<template>
    <div>
        <v-form ref="form" @submit.prevent="update">
            <v-card class="pa-10 bg-white rounded position-relative">
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
                    <v-text-field v-model="address.detail" density="compact" :placeholder="$t('product.name')" variant="outlined">
                        <template v-slot:append-inner>
                            <span class="text-note">1/100</span>
                        </template>
                    </v-text-field>
                </div>

                <div class="d-flex w-100 justify-end">
                    <v-btn style="width: 20%;" color="blue" type="submit">Lưu</v-btn>
                </div>
 
                <Loading v-if="loading" style="z-index: 1; background: grey; opacity: 0.3;" class="position-absolute top-0 right-0"></Loading>
                <v-dialog v-model="success" class="position-absolute top-0 right-0 h-100 w-100" persistent>
                    <Success :message="$t('message.info.create_account')"></Success>
                </v-dialog>
            </v-card>
        </v-form>
    </div>
</template>

<script>
import { RequiredRule, BirthdayRule, FileRule, RadioRule, SelectRule } from '@/rules/Rule';
import AddressApi from '@/services/api/AddressApi';
import Loading from '../common/Loading.vue';
import Success from '../common/Success.vue';

export default {
    data: () => ({
        address: {
            country: 'Viet Nam',
            city: null,
            district: null,
            ward: null,
            detail: null
        },
        cities: [],
        districts: [],
        wards: [],
        countryId: null,
        cityId: null,
        districtId: null,
        wardId: null,
        loading: false,
        success: true
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
        this.fetchAddress();
    },

    methods: {
        async fetchCity() {
            const response = await AddressApi.getAllCities();
            if(response.status === 200) {
                const data = response.data;
                this.cities = data.data;
            }
            console.log(this.cities)
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
        },

        async update() {
            this.loading = true;
            this.address.city = this.cities.find(city => city.id === this.cityId).full_name;
            this.address.district = this.districts.find(district => district.id === this.districtId).full_name;
            this.address.ward = this.wards.find(ward => ward.id === this.wardId).full_name;

            const response = await AddressApi.update(this.address);
            this.loading = false;
            if(response.data.code === 200) {
                
        
            }
        },

        async fetchAddress() {
            const response = await AddressApi.get();
            console.log(response)
            if(response && response.data.data && response.data.code === 200) {
                this.address = response.data.data;

                await this.fetchCity();
                this.cityId = this.cities.find(city => city.full_name === this.address.city).id;

                await this.fetchDistrict();
                this.districtId = this.districts.find(district => district.full_name === this.address.district).id;

                await this.fetchWard();
                this.wardId = this.wards.find(ward => ward.full_name === this.address.ward).id;
            }
            else {
                this.fetchCity();
            }
        }

    }
}
</script>