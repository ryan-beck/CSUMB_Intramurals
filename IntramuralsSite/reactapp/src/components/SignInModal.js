import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View, StyleSheet } from "react-native";
import GoogleBtnHook from './GoogleLoginHandling'

class SignInModal extends Component {
	constructor(props) {
	    super(props);

		this.state = {
			modalVisible: false
		};

		this.setModalVisible = this.setModalVisible.bind(this);
	}

	setModalVisible (visible) {
		this.setState(state => ({
	        modalVisible: visible
	    }));
	}

	render() {
		const { modalVisible } = this.state;
		return (
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					visible={ modalVisible }
					onRequestClose={() => {
						Alert.alert("Modal is closed.");
						this.setModalVisible(!modalVisible);
					}}
					presentationStyle="formSheet"
					transparent={false}
				>
					<View style={styles.centeredView}>
			            <View style={styles.modalView}>
			            	<Text style={styles.modalText}>Welcome to CSUMB Intramurals</Text>
			            	<GoogleBtnHook/>
			              	<Pressable
			                	style={[styles.button, styles.buttonClose]}
			                	onPress={() => this.setModalVisible(!modalVisible)}
			              	>
			                	<Text style={styles.textStyle}>Hide Modal</Text>
			              	</Pressable>
			            </View>
			        </View>
		        </Modal>
		        <Pressable
		        	style={[styles.button, styles.buttonOpen]}
		        	onPress={() => this.setModalVisible(true)}
		        >
		        	<Text style={styles.textStyle}>Show Modal</Text>
		        </Pressable>
		    </View>
		);
	}

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#00688B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  	fontWeight: "bolder"
  }
});

export default SignInModal;