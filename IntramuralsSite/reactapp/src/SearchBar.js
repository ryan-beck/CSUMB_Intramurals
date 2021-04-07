import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const SearchTextInput = () => {
    

   function logChange(val) {
     console.log("Selected: " + val.value);
   } 

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder=" Search for Sports"
        keyboardType="numeric"
      />
      <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="Active"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="start"
          control={<Radio color="primary" />}
          label="Past"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
      
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "50%",
    margin: "auto",
    borderWidth:2,
  },
});


export default SearchTextInput;