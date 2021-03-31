import translations from './lang/translations.eng.json';

interface Attributes {
    [key: string]: string;
}

function replaceAttributes(label: string, options: Attributes = {}): string {
    // Replaces any ":key" with a value in the options
    return label.replace(/:(\w+)/gi, (word) => {
        const key = word.replace(/^:/, '');

        if (options[key] === undefined || options[key] === null) {
            return '';
        }

        return options[key];
    });
}

export function ucFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.substring(1);
}


export default function trans(key: string, attributes?: Attributes, uppercaseFirstLetter?: boolean): string {
    // @ts-ignore
    const result: string = translations[key];

    if (!result) {
        return key;
    }

    const resultWithAttributes = replaceAttributes(result, attributes);
    return uppercaseFirstLetter ? ucFirstLetter(resultWithAttributes) : resultWithAttributes;
}

export function booleanToYesNo(bool = false): string {
    return bool ? trans('global.yes') : trans('global.no');
}
