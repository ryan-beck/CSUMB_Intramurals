import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View, StyleSheet } from "react-native";
import JoinPasswordForm from './JoinPasswordForm';


import '../../style/leagueForm.css'

class JoinPasswordFormModal extends Component {
	constructor(props) {
	    super(props);

		this.state = {
			modalVisible: false,
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
					presentationStyle="formSheet"
					transparent={true}
				>
					<View style={styles.centeredView}>
			            <View style={styles.modalView}>
			            	<JoinPasswordForm user={this.props.user} teamId={this.props.teamId} teamFull={this.props.teamFull}/>
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
                            style={styles.editButton}
                            onPress={() => this.setModalVisible(true)}
                        >
                            
                            <Text style={styles.textStyle}>Join With Password</Text>
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
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 12
    },
    editButton: {
        borderRadius: 20,
        padding: 5,
        width: 150,
        backgroundColor: "#00688B",
    }
});

export default JoinPasswordFormModal;