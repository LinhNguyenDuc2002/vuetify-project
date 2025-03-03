import axios from 'axios';

const BaseApi = {
    get: async (uri, header, params) => {
        try {
            const response = await axios.get(
                uri, 
                {
                    headers: header,
                    params: params
                }
            );

            return response;
        }
        catch (error) {
            BaseApi.handleError(error);
            return null;
        }
    },
    
    post: async (uri, body, header) => {
        try {
            const response = await axios.post(
                uri, 
                body,
                {
                    headers: header
                }
            );

            return response;
        }
        catch (error) {
            console.log("Calling api is fail!");
            BaseApi.handleError(error);
            return error.response;
        }
    },

    put: async (uri, body, header) => {
        try {
            const response = await axios.put(
                uri, 
                body,
                {
                    headers: header
                }
            );

            return response;
        }
        catch (error) {
            console.log("Calling api is fail!");
            BaseApi.handleError(error);
            return null;
        }
    },

    delete: async (uri, header) => {
        try {
            const response = await axios.delete(
                uri, 
                {
                    headers: header
                }
            );
            
            return response;
        }
        catch (error) {
            console.log("Calling api is fail!");
            BaseApi.handleError(error);
            return error.response;
        }
    },

    handleError: (error) => {
        if (error.response) {
            // Nếu có response từ server nhưng không thành công
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            // Nếu request được gửi đi nhưng không nhận được response
            console.error('Request:', error.request);
        } else {
            // Xử lý lỗi khác
            console.error('Error:', error.message);
        }
    }
};

export default BaseApi;