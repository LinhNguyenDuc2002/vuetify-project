import * as SecurityConstant from '@/constants/security_constant';
import * as HeaderParam from '@/constants/header_constant';
import { ENV_BASE_API, ENV_CLIENT_ID, ENV_CLIENT_SECRET, ENV_GRANT_TYPE } from '@/constants/env_constant';
import BaseApi from './BaseApi';
import I18n from '@/i18n/i18n';

const CONTEXT_PATH = "/api/user-service/oauth2/token"

const AuthApi = {
    login: async (username, password) => {
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
            [HeaderParam.ACCEPT_LANGUAGE]: 'vi',
            'x-origin': 'abc'
        }

        var data = {
            [SecurityConstant.CLIENT_ID]: ENV_CLIENT_ID,
            [SecurityConstant.CLIENT_SECRET]: ENV_CLIENT_SECRET,
            [SecurityConstant.GRANT_TYPE]: ENV_GRANT_TYPE,
            [SecurityConstant.USERNAME]: username,
            [SecurityConstant.PASSWORD]: password,
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        const response = await BaseApi.post(uri, data, header);
        if(response == null) {
            return null;
        }
        
        return response;
    },
};

export default AuthApi;