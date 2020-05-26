import { Patient } from '../../types';

const MIN_QUERY_LENGTH = 4;

const createKeywords = (str: string) => {
    const [minChars, restStr] = [str.slice(0, MIN_QUERY_LENGTH), str.slice(MIN_QUERY_LENGTH)];
    const arrName: string[] = [minChars];
    let curName = `${minChars}`;

    restStr.split('').forEach((letter) => {
        curName += letter;
        arrName.push(curName);
    });
    return arrName;
};

const generateKeywords = (patient: Patient) => {
    // take only first 3 tokens in the name
    const [nameToken1, nameToken2 = '', nameToken3 = ''] = patient.name.toLowerCase().split(' ').slice(0, 3);

    const keywordPatientId = createKeywords(patient.id);
    const keyworkdName12 = createKeywords(`${nameToken1} ${nameToken2}`);
    const keywordName21 = createKeywords(`${nameToken2} ${nameToken1}`);
    const keyworkdName13 = nameToken3 ? createKeywords(`${nameToken1} ${nameToken3}`) : [];
    const keyworkdName31 = nameToken3 ? createKeywords(`${nameToken3} ${nameToken1}`) : [];
    const keyworkdName123 = nameToken3 ? createKeywords(`${nameToken1} ${nameToken2} ${nameToken3}`) : [];

    return Array.from(
        new Set([
            ...keywordPatientId,
            ...keyworkdName12,
            ...keywordName21,
            ...keyworkdName13,
            ...keyworkdName31,
            ...keyworkdName123,
        ]),
    );
};

export default generateKeywords;
