
import { Card, Row, Col } from "react-bootstrap";
import { Award, Check, X } from "lucide-react";

const UserProfile = ({ user, className }) => {
  const { score } = user;
  const accuracy = score.total > 0 
    ? Math.round((score.correct / score.total) * 100) 
    : 0;
  
  return (
    <Card className={className}>
      <Card.Body className="text-center">
        <div className="mb-2 d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary mx-auto" style={{ width: "56px", height: "56px" }}>
          <Award size={24} />
        </div>
        <Card.Title>{user.username}</Card.Title>
        
        <Row className="mt-4 g-3">
          <Col xs={4}>
            <div className="p-2 rounded bg-light">
              <div className="small text-muted">Score</div>
              <div className="fw-medium">{score.correct}</div>
            </div>
          </Col>
          <Col xs={4}>
            <div className="p-2 rounded bg-light">
              <div className="small text-muted">Accuracy</div>
              <div className="fw-medium">{accuracy}%</div>
            </div>
          </Col>
          <Col xs={4}>
            <div className="p-2 rounded bg-light">
              <div className="small text-muted">Played</div>
              <div className="fw-medium">{score.total}</div>
            </div>
          </Col>
        </Row>
        
        <div className="mt-4 d-flex gap-4 justify-content-center">
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle bg-success bg-opacity-20 p-1">
              <Check size={14} className="text-success" />
            </div>
            <span className="small">{score.correct}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle bg-danger bg-opacity-20 p-1">
              <X size={14} className="text-danger" />
            </div>
            <span className="small">{score.incorrect}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
