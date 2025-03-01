import { Card } from "react-bootstrap";
import { MapPin } from "lucide-react";

const ClueCard = ({ clue, index, revealed = false }) => {
  return (
    <Card 
      className={`mb-3 ${revealed ? "bg-light" : ""}`}
    >
      <Card.Body>
        <div className="d-flex align-items-start gap-3">
          <div className="mt-1 p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
            <MapPin size={18} />
          </div>
          <div>
            <div className="text-uppercase small text-muted mb-1">
              Clue {index + 1}
            </div>
            <p className="mb-0">{clue}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClueCard;
