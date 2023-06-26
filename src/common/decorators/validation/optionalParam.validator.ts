import { ValidationArguments, registerDecorator } from "class-validator";

export function OneOfOptionalRequired(values: any[]) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "OneOfOptionalRequired",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `${propertyName} must be one of ${values}`,
            },
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    if (value === undefined) {
                        return true;
                    }
                    return values.includes(value);
                },
            },
        });
    };
}
