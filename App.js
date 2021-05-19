import {
    StyleSheet,
    Pressable,
    Vibration,
    View,
    Text,
    Image,
    Dimensions,
    Button,
    ScrollView,
    TextInput,
} from 'react-native';

import React, { useEffect, useRef, useState } from 'react';

import { dictionaryRus } from './dictionary';

const App = () => {
    const [word, setWord] = useState('');
    console.log(word);
    const arrayOfBraille = stringToArrayBraille(word);

    return (
        <View style={styles.wrapper}>
            <TextInput
                onChangeText={(text) => setWord(text)}
                style={styles.input}
            />
            <View style={styles.imgWrapper}>
                <Text>SomeIMG</Text>
            </View>
            <ScrollView
                alwaysBounceHorizontal={true}
                horizontal={true}
                style={styles.line}
            >
                <View style={styles.lineInner}>
                    {arrayOfBraille.map((item, index) => (
                        <LetterInBraille
                            key={item + index}
                            brailleEncoding={item}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const LetterInBraille = ({ brailleEncoding }) => {
    return (
        <View style={styles.letterWrapper}>
            {brailleEncoding.map((item, index) => (
                <View
                    key={index}
                    style={{
                        ...styles.letterDot,
                        backgroundColor: item && '#000',
                    }}
                ></View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ff0',
        position: 'relative',
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        marginTop: 50,
        borderWidth: 1,
    },
    line: {
        maxHeight: 250,
        backgroundColor: '#999',
    },
    letterDot: {
        marginVertical: 15,
        marginHorizontal: 25,
        height: 20,
        width: 20,
    },
    lineInner: { flexDirection: 'row' },
    imgWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    letterWrapper: {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: '#0f0',
        height: 200,
        width: 140,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
    },
});

function stringToArrayBraille(string) {
    const arrayOfLetter = string.split('');
    const arrayOfBraille = arrayOfLetter.map((item) => {
        return getLetterInBraille(item.toLowerCase(), dictionaryRus);
    });
    return arrayOfBraille;
}

function getLetterInBraille(letter, dictionary = []) {
    let brailleEncoding = false;
    dictionary.forEach((element) => {
        if (letter === element.letter) {
            brailleEncoding = element.brailleEncoding;
        }
    });
    return brailleEncoding;
}

export default App;
