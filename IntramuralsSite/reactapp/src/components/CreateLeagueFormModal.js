import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View, StyleSheet } from "react-native";
import CreateLeagueForm from './CreateLeagueForm'


class CreateLeagueFormModal extends Component {
	constructor(props) {
	    super(props);

		this.state = {
			modalVisible: false,
            sportId: props.sportId,
            sportName: props.sportName
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
			<View>
				<Modal
					animationType="slide"
					visible={ modalVisible }
					onRequestClose={() => {
						Alert.alert("Modal is closed.");
						this.setModalVisible(!modalVisible);
					}}
					presentationStyle="formSheet"
					transparent={true}
				>
					<View style={styles.centeredView}>
			            <View style={styles.modalView}>
			            	<CreateLeagueForm sportId={this.state.sportId} sportName={this.state.sportName}/>
			              	<Pressable
			                	style={[styles.button, styles.buttonClose]}
			                	onPress={() => this.setModalVisible(!modalVisible)}
			              	>
			                	<Text style={styles.textStyle}>Cancel</Text>
			              	</Pressable>
			            </View>
			        </View>
		        </Modal>
		        <Pressable
		        	onPress={() => this.setModalVisible(true)}
		        >
		        	<button>Add League</button>
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
        borderRadius: 5,
        padding: 10,
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

export default CreateLeagueFormModal;