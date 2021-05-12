import React, { Component } from "react";
import { Alert, Modal, Text, Pressable, View, StyleSheet } from "react-native";
import CreatePostForm from './CreatePostForm';
import edit from '../assets/pencil.png';

class CreatePostFormModal extends Component {
	constructor(props) {
	    super(props);

		this.state = {
			modalVisible: false,
            userId: props.userId,
            post: props.post,
            isCreating: props.create
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
			            	<CreatePostForm userId={this.state.userId} post={this.state.post} create={this.state.isCreating}/>
			              	<Pressable
			                	onPress={() => this.setModalVisible(!modalVisible)}
			              	>
			                	<Text style={styles.textStyle}>Cancel</Text>
			              	</Pressable>
			            </View>
			        </View>
		        </Modal>
                <span>
                    {this.state.isCreating ? (
                        <Pressable
                            style={styles.addButton}
                            onPress={() => this.setModalVisible(true)}
                        >
                            
                                <Text style={styles.textStyle}>Add a Post</Text>
                        </Pressable>
                    )
                    : (
                        <Pressable
                            style={styles.editButton}
                            onPress={() => this.setModalVisible(true)}
                        >
                            
                                <Text style={styles.textStyle}>Edit Post</Text>
                        </Pressable>
                    )}
                    
                </span> 
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    addButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        float:"left",
        backgroundColor: "#00688B",
        width: 500
    },
    editButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        float:"right",
        backgroundColor: "#00688B",
    }
});

export default CreatePostFormModal;