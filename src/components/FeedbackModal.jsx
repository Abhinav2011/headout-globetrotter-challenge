import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Frown, PartyPopper } from "lucide-react";
import ConfettiEffect from "./ConfettiEffect";

const FeedbackModal = ({
  isOpen,
  isCorrect,
  destinationName,
  funFact,
  onClose,
  onNext,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && isCorrect) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isCorrect]);

  return (
    <>
      {showConfetti && <ConfettiEffect />}
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              {isCorrect ? (
                <div className="p-2 rounded-circle bg-success bg-opacity-20 text-success">
                  <PartyPopper size={20} />
                </div>
              ) : (
                <div className="p-2 rounded-circle bg-danger bg-opacity-20 text-danger">
                  <Frown size={20} />
                </div>
              )}
              <h5 className="mb-0">
                {isCorrect ? "Correct!" : "Not quite..."}
              </h5>
            </div>
            <Button
              variant="light"
              size="sm"
              className="rounded-circle p-1"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>

          <div className="mb-4">
            <div className="text-muted small mb-1">Destination</div>
            <div className="fw-medium fs-5">{destinationName}</div>
          </div>

          <div className="bg-light p-3 rounded mb-4">
            <div className="text-muted small mb-1">Fun Fact</div>
            <p className="mb-0">{funFact}</p>
          </div>

          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={onNext}
            >
              {isCorrect ? "Next Challenge" : "Try Again"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeedbackModal;
