
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "sonner";

const UsernameModal = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    
    setIsLoading(true);
    try {
      onSubmit(username);
      setUsername("");
    } catch (error) {
      console.error("Error submitting username:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Globetrotter!</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Choose a username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., TravelExplorer"
              disabled={isLoading}
              maxLength={20}
              minLength={3}
            />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || !username.trim()}
          >
            Let's Go!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UsernameModal;
