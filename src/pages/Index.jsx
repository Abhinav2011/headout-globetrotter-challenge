import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, MapPin, Trophy, Users } from "lucide-react";
import UsernameModal from "../components/UsernameModal";
import { api } from "../services/api";
import { toast } from "sonner";
import { 
  Button, 
  Container, 
  Row, 
  Col, 
  Card,
  Image
} from 'react-bootstrap';

const Index = () => {
  const navigate = useNavigate();
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUsername, setHasUsername] = useState(false);
  
  useEffect(() => {
    // Check if user has username in local storage
    const checkExistingUser = async () => {
      const storedUsername = localStorage.getItem("globetrotter_username");
      if (storedUsername) {
        try {
          const user = await api.getUser(storedUsername);
          if (user) {
            setHasUsername(true);
          } else {
            // Username no longer exists in "database"
            localStorage.removeItem("globetrotter_username");
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    };
    
    checkExistingUser();
  }, []);
  
  const handleStartGame = () => {
    if (hasUsername) {
      navigate("/play");
    } else {
      setUsernameModalOpen(true);
    }
  };
  
  const handleSubmitUsername = async (username) => {
    try {
      setIsLoading(true);
      await api.saveUser(username);
      localStorage.setItem("globetrotter_username", username);
      setUsernameModalOpen(false);
      toast.success("Welcome to Globetrotter!");
      navigate("/play");
    } catch (error) {
      console.error("Error saving username:", error);
      toast.error("Failed to create user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="text-center">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Globe className="text-primary" size={32} />
              <h1 className="display-4 fw-bold">Globetrotter</h1>
            </div>
            <p className="text-muted mt-2">
              Test your geography knowledge with cryptic clues about famous destinations around the world
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center g-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm mb-3">
              <Image 
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80" 
                alt="Paris, France" 
                fluid
              />
            </Card>
            {/* <Card className="border-0 shadow-sm">
              <Image 
                src="https://images.unsplash.com/photo-1597212618440-806262de4f6e?w=600&auto=format&fit=crop&q=80" 
                alt="Marrakech, Morocco" 
                fluid
              />
            </Card> */}
          </Col>
          
          <Col md={6}>
            <Card className="border-0 shadow-sm p-4">
              <h2 className="display-6 mb-4">Ready for a global adventure?</h2>
              
              <div className="mb-4">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="h5">Guess Mystery Destinations</h3>
                    <p className="text-muted small">Solve cryptic clues to identify famous places around the world</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                    <Trophy size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="h5">Build Your Score</h3>
                    <p className="text-muted small">Track your knowledge and improve your geography skills</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                    <Users size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="h5">Challenge Friends</h3>
                    <p className="text-muted small">Share your score and invite friends to beat it</p>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleStartGame} 
                disabled={isLoading}
                className="w-100"
              >
                {hasUsername ? "Continue Your Journey" : "Start Your Journey"}
              </Button>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col className="text-center text-muted">
            <p className="small">© {new Date().getFullYear()} Globetrotter • Made by Abhinav (and AI) for Headout</p>
          </Col>
        </Row>
      </Container>
      
      <UsernameModal
        isOpen={usernameModalOpen}
        onClose={() => setUsernameModalOpen(false)}
        onSubmit={handleSubmitUsername}
      />
    </div>
  );
};

export default Index;
