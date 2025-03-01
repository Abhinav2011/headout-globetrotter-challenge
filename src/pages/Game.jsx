import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import { api } from "../services/api";
import ClueCard from "../components/ClueCard";
import DestinationCard from "../components/DestinationCard";
import FeedbackModal from "../components/FeedbackModal";
import { toast } from "sonner";
import { ArrowLeft, Award, Share2 } from "lucide-react";
import ShareModal from "../components/ShareModal";
import UserProfile from "../components/UserProfile";

const Game = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [correctDestination, setCorrectDestination] = useState(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [clues, setClues] = useState([]);
  const [funFact, setFunFact] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  // Load user data and start game
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        
        if (username) {
          const userData = await api.getUser(username);
          if (userData) {
            setUser(userData);
            loadGame();
          } else {
            toast.error("User not found");
            navigate("/");
          }
        } else {
          if (!localStorage.getItem("globetrotter_username")) {
            navigate("/");
            return;
          }
          
          const localUsername = localStorage.getItem("globetrotter_username") || "";
          const userData = await api.getUser(localUsername);
          
          if (userData) {
            setUser(userData);
          } else {
            localStorage.removeItem("globetrotter_username");
            navigate("/");
            return;
          }
          
          loadGame();
        }
      } catch (error) {
        console.error("Error loading game:", error);
        toast.error("Failed to load game. Please try again.");
      } finally {
        setLoading(false);
        setInitialLoaded(true);
      }
    };

    loadUser();
  }, [username, navigate]);

  const loadGame = async () => {
    try {
      if (questionCount >= 10) {
        setGameEnded(true);
        setFeedbackOpen(false);
        toast.success(`Game Over! Final Score: ${user.score.correct} out of 10`);
        return;
      }

      setLoading(true);
      setRevealedAnswer(false);
      setSelectedDestinationId(null);
      
      const correctDest = await api.getRandomDestination();
      console.log("Correct destination:", correctDest);
      setCorrectDestination(correctDest);
      
      const clueCount = Math.floor(Math.random() * 2) + 1;
      const randomClues = [...correctDest.clues]
        .sort(() => 0.5 - Math.random())
        .slice(0, clueCount);
      setClues(randomClues);
      
      const randomFactIndex = Math.floor(Math.random() * correctDest.funFacts.length);
      setFunFact(correctDest.funFacts[randomFactIndex]);
      
      const otherDestinations = await api.getGameDestinations(correctDest.id, 3);
      
      const allDestinations = [...otherDestinations, correctDest]
        .sort(() => 0.5 - Math.random());
      
      setDestinations(allDestinations);
    } catch (error) {
      console.error("Error loading game:", error);
      toast.error("Failed to load game data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDestination = async (destId) => {
    if (revealedAnswer || !user) return;
    
    setSelectedDestinationId(destId);
    const isAnswerCorrect = destId === correctDestination?.id;
    setIsCorrect(isAnswerCorrect);
    
    try {
      const updatedUser = await api.updateUserScore(user.username, isAnswerCorrect);
      setUser(updatedUser);
      
      if (!username) {
        localStorage.setItem("globetrotter_username", user.username);
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
    
    setRevealedAnswer(true);
    setFeedbackOpen(true);
    setQuestionCount(prev => prev + 1);
  };

  const handleNextChallenge = () => {
    setFeedbackOpen(false);
    loadGame();
  };

  const goToHome = () => {
    navigate("/");
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/play/${user?.username}`;
  };
  
  const resetUserScore = async () => {
    try {
      const resetScore = { correct: 0, incorrect: 0, total: 0 };
      const updatedUser = await api.saveUser(user.username, resetScore);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error resetting score:", error);
      toast.error("Failed to reset score");
    }
  };

  const GameEndScreen = () => (
    <div className="text-center py-5">
      <h2 className="mb-4">Game Over!</h2>
      <Card className="max-w-md mx-auto p-4">
        <Card.Body>
          <h3 className="mb-3">Final Score: {user.score.correct} / 10</h3>
          <p className="mb-4">Accuracy: {Math.round((user.score.correct / 10) * 100)}%</p>
          <div className="d-flex gap-3 justify-content-center">
            <Button 
              variant="primary" 
              onClick={async () => {
                await resetUserScore();
                setQuestionCount(0);
                setGameEnded(false);
                loadGame();
              }}
            >
              Play Again
            </Button>
            <Button variant="outline-secondary" onClick={goToHome}>
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  if (loading && !initialLoaded) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p className="text-muted">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-white d-flex flex-column">
      <header className="border-bottom py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="light" onClick={goToHome} className="d-flex align-items-center gap-2">
              <ArrowLeft size={16} />
              <span className="d-none d-sm-inline">Back to Home</span>
            </Button>
            
            <div className="d-flex align-items-center gap-3">
              {user && (
                <>
                  <div className="d-none d-md-flex align-items-center gap-2">
                    <Award size={18} className="text-primary" />
                    <span className="fw-medium">{user.score.correct} points</span>
                  </div>
                  
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setShareOpen(true)}
                    className="d-flex align-items-center gap-2"
                  >
                    <Share2 size={16} />
                    <span className="d-none d-sm-inline">Challenge a Friend</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </header>
      
      <main className="flex-grow-1 py-4 py-md-5">
        <Container>
          {gameEnded ? (
            <GameEndScreen />
          ) : (
            <Row className="g-4">
              <Col md={3}>
                <div className="sticky-top pt-3">
                  {user && <UserProfile user={user} />}
                </div>
              </Col>
              
              <Col md={9}>
                <div className="mb-5">
                  <section className="mb-4">
                    <h2 className="mb-3 fw-semibold">Where am I?</h2>
                    <div>
                      {clues.map((clue, index) => (
                        <ClueCard 
                          key={`${index}-${clue.substring(0, 10)}`} 
                          clue={clue} 
                          index={index} 
                          revealed={revealedAnswer}
                        />
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="mb-3 fw-semibold">Select your answer</h2>
                    <Row xs={1} sm={2} lg={4} className="g-3">
                      {destinations.map((destination) => (
                        <Col key={destination.id}>
                          <DestinationCard
                            name={destination.name}
                            country={destination.country}
                            // image={destination.image}
                            onClick={() => handleSelectDestination(destination.id)}
                            selected={selectedDestinationId === destination.id}
                            correct={destination.id === correctDestination?.id}
                            revealed={revealedAnswer}
                            disabled={revealedAnswer}
                          />
                        </Col>
                      ))}
                    </Row>
                  </section>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </main>
      
      <FeedbackModal
        isOpen={feedbackOpen}
        isCorrect={isCorrect}
        destinationName={correctDestination?.name || ""}
        funFact={funFact}
        onClose={() => setFeedbackOpen(false)}
        onNext={handleNextChallenge}
      />
      
      {user && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          user={user}
          shareUrl={getShareUrl()}
        />
      )}
    </div>
  );
};

export default Game;
