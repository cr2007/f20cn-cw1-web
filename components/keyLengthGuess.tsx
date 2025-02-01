function calculateIndexOfCoincidence(cipherMessage:string): number {
    const messageLength: number = cipherMessage.length;

    const letterToFreq: Record<string, number> = cipherMessage.toUpperCase().split('').reduce(
        (acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {} as Record<string, number>
    );

    let indexOfCoincidence: number = Object.values(letterToFreq).reduce(
        (sum, probability) => sum + probability * (probability - 1), 0
    );

    indexOfCoincidence /= ( messageLength * (messageLength - 1) );

    return parseFloat(indexOfCoincidence.toFixed(4))
}

interface KeyLengthGuessProps {
    ciphertext: string;
    keyLengthGuess: number;
}

export const KeyLengthGuess: React.FC<KeyLengthGuessProps> = ({ciphertext, keyLengthGuess}) => {
    const subMessages: string[] = Array.from({ length: keyLengthGuess }, (_, i) =>
        ciphertext.split('').filter((_, index) => index % keyLengthGuess === i).join('')
    );

    const subMessageIocs: number[] = subMessages.map(subMessage => calculateIndexOfCoincidence(subMessage));

    console.log(`IOC for Key Length ${keyLengthGuess} = ${subMessageIocs}`);

    const averageIoc: number = subMessageIocs.reduce((sum, ioc) => sum + ioc, 0) / subMessageIocs.length;

    const iocEnglish: number = 0.0686;

    const iocDifference: number = Math.abs(averageIoc - iocEnglish);

    return (
    <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
        {`${keyLengthGuess} is ${iocDifference < 0.01 ? "" : "not"} a possible key length`}
    </p>
    )
}
