import { Card } from "react-bootstrap";
import { Check, X } from "lucide-react";

const DestinationCard = ({
  name,
  country,
  onClick,
  selected = false,
  correct,
  revealed = false,
  disabled = false
}) => {
  const getCardBorderClass = () => {
    if (revealed && correct) return "border-success";
    if (revealed && !correct) return "border-danger";
    if (selected) return "border-primary";
    return "";
  };

  return (
    <div className={disabled ? "opacity-50" : ""}>
      <Card 
        className={`h-100 ${getCardBorderClass()}`}
        onClick={!disabled ? onClick : undefined}
        style={{ 
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        }}
        onMouseOver={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <div className="position-relative">
          
          {revealed && (
            <div className={`position-absolute top-0 end-0 m-2 rounded-circle p-1 ${correct ? "bg-success" : "bg-danger"}`}>
              {correct ? (
                <>
                  <Check size={16} className="text-white" />
                </>
              ) : (
                <X size={16} className="text-white" />
              )}
            </div>
          )}
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className="text-muted">{country}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DestinationCard;
