import React, {Component} from "react";
import { StyleSheet, TextInput } from "react-native";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const SearchTextInput = () => {
    
  return (
    <div>
      <TextInput
        style={styles.input}
        placeholder=" Search for Sports"
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