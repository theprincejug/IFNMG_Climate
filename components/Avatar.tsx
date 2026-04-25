import { Image, StyleSheet,TouchableOpacity, View } from "react-native";

type AvatarProps = {
  aoTocar?: () => void;
};

export default function Avatar({aoTocar}: AvatarProps) {
  return (
    <TouchableOpacity onPress={aoTocar}>
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetUgcct49HD1Lk9kBeAI_GXurNvKcCNRmHA&s",
        }}
      />
    </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0fcf0fff",
    borderRadius: 50,
        overflow: "hidden",
  },
  imagem: {
	width: 90,
	height: 90,
    borderRadius: 45,
  },
});
