export const ErrorHelper = {
    required: (attribute: string = 'This attribute') => {
        return  'Vui lòng nhập ' + attribute;
    },
    invalid: (attribute: string = 'This attribute') => {
        return attribute + ' không hợp lệ';
    },
    invalidEmail: (attribute: string = 'This attribute') => {
        return attribute + ' có định dạng không hợp lệ. Vui lòng thử lại';
    },
    minlength: (length: number, attribute: string = 'This attribute') => {
        return attribute + ' phải ít nhất ' + length + ' ký tự';
    },
    maxlength: (length: number, attribute: string = 'This attribute') => {
        return attribute + ' không dài quá ' + length + ' ký tự';
    },
    pattern: (message: string = '', attribute: string = 'This attribute') => {
        if (message) {
            return message;
        }
        return attribute + ' có cú pháp không hợp lệ';
    },
    notequal: (attributeA: string, attributeB: string, message: string = '') => {
        if (message) {
            return message;
        }
        return attributeA + ' không bằng ' + attributeB;
    },
    message: (message: string) => {
        return message;
    }
}