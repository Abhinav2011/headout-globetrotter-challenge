
import { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { Check, Copy, Share2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import UserProfile from "./UserProfile";

const ShareModal = ({ isOpen, onClose, user, shareUrl }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const shareToWhatsApp = () => {
    const text = `${user.username} challenged you to beat their score of ${user.score.correct} on Globetrotter! Play now: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Challenge a Friend</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="bg-white rounded border p-4 mb-4">
          <div className="text-center mb-3">
            <h5>I challenge you to beat my score!</h5>
          </div>
          
          <UserProfile user={user} />
          
          <div className="mt-4 text-center small">
            <p className="mb-0">Scan the code or click the link below to play</p>
          </div>
        </div>
        
        <Form.Group className="mb-3">
          <Form.Label>Share link</Form.Label>
          <InputGroup>
            <Form.Control
              ref={inputRef}
              value={shareUrl}
              readOnly
            />
            <Button 
              variant="outline-secondary"
              onClick={copyToClipboard}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onClose}
          className="d-flex align-items-center gap-2"
        >
          <Share2 size={16} />
          Close
        </Button>
        <Button
          variant="primary"
          onClick={shareToWhatsApp}
          className="d-flex align-items-center gap-2"
        >
          <Smartphone size={16} />
          Share to WhatsApp
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
