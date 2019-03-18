import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./button";
const Pagination = props => {
  if (props.count == 0) {
    return null;
  }
  const maxOffset =
    Math.ceil(props.count / props.limit) * props.limit - props.limit;
  const prevOffset = Math.max(0, props.offset - props.limit);
  const nextOffset = Math.min(maxOffset, props.offset + props.limit);
  const currentPage = Math.ceil(props.offset / props.limit) + 1;
  return (
    <View style={pStyles.container}>
      <Button
        title="<<"
        style={pStyles.button}
        onPress={() => props.onPress(0)}
      />
      <Button
        title="<"
        style={pStyles.button}
        onPress={() => props.onPress(prevOffset)}
      />
      <Button
        title={currentPage.toString()}
        style={pStyles.button}
        onPress={() => {}}
      />
      <Button
        title=">"
        style={pStyles.button}
        onPress={() => props.onPress(nextOffset)}
      />
      <Button
        title=">>"
        style={pStyles.button}
        onPress={() => props.onPress(maxOffset)}
      />
    </View>
  );
};
const pStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100,
    borderTopWidth: 1,
    borderColor: "darkgray"
  },
  button: {
    borderRadius: 0,
    borderWidth: 0
  }
});

export default Pagination;
