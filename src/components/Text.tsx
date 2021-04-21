/**
 * Componente de texto
 */
import React from 'react';
import { Text } from 'react-native';

type ComponentProps = {
    style?: any;
    children?: any;
};

const Component: React.FC<ComponentProps> = ({
    style,
    children
}) => (
    <Text style={style}>
        {children}
    </Text>
);

export default Component;