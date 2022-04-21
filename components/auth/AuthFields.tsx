import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};