import { ERROR_MESSAGE } from "@/constants/message_constants";

export const RequiredRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.not_empty),
]