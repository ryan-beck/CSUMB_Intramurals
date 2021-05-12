import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View, StyleSheet } from "react-native";
import CreateTeamForm from './CreateTeamForm';


import '../../style/leagueForm.css'

class JoinTeamPasswordModal extends Component {
	constructor(props) {
	    super(props);

		this.state = {
			modalVisible: false,
            leagueId: props.leagueId,
            user: props.user
		};

		this.setModalVisible = this.setModalVisible.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	setModalVisible (visible) {
		this.setState(state => ({
	        modalVisible: visible
	    }));
	}

    handleFormSubmit (newSport) {
        this.setModalVisible(false);
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
			            	<CreateTeamForm handleFormSubmit={this.handleFormSubmit} leagueId={this.state.leagueId} user={this.state.user}/>
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
                            
                            <Text style={styles.textStyle}>Start a Team</Text>
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
        fontSize: 15
    },
    editButton: {
        borderRadius: 20,
        padding: 12,
        backgroundColor: "#00688B",
    }
});

export default JoinTeamPasswordModal;