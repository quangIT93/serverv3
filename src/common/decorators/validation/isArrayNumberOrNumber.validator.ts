
import { ValidationArguments, registerDecorator } from "class-validator";

export function IsArrayNumberOrNumber(options: { each: boolean, maxLength: number } = { each: false, maxLength: 2 }) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'isArrayNumberOrNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: {
                message: 'Value must be a number or an array of numbers',
            },
        
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    try {
                        if (!value) {
                            return false;
                        }
                        if (options.each) {
                            if (!Array.isArray(value)) {
                                return false;
                            }

                            if (value.length > options.maxLength) {
                                return false;
                            }

                            for (const item of value) {
                                const number = Number(item);
                                if (isNaN(number)) {
                                    return false;
                                }
                            }

                            return true;
                        }
                        else {
                            const number = Number(value);
                            if (isNaN(number)) {
                                return false;
                            }

                            return true;
                        }
                    }      
                    catch (error) {
                        console.log(error);
                        return false;
                    }
                },
            }
        });
    }
}