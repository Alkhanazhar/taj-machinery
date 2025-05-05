// components/SimpleButton.js
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, { backgroundColor }, style]}
        >
            <Text style={[styles.text, { color: textColor }, textStyle]}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
    },
    text: {
        fontSize: wp('4%'),
        fontWeight: '600',
    },
});

export default Button;
