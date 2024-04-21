import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Learning = () => {
  return (
    <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col lg={6}>
          <img
            src="https://th.bing.com/th/id/OIP.uJMG06Ax31Y0WMI9pBf2swHaFj?rs=1&pid=ImgDetMain"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Welcome to Medilitics Learning
          </h1>
          <p className="lead">
            At Medilitics Learning, we're dedicated to providing reliable,
            informative, and empowering resources to help you take charge of
            your health journey. Whether you're seeking guidance on preventive
            care, navigating a specific medical condition, or simply staying
            informed about the latest healthcare trends, our comprehensive
            platform is designed to meet your needs.
          </p>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6}>
          <Card className="border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <Card.Body className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">
                Health
              </strong>
              <Card.Title as="h3" className="mb-0">
                The Importance of Mental Health Awareness
              </Card.Title>
              <Card.Subtitle className="mb-1 text-body-secondary">
                April 20
              </Card.Subtitle>
              <Card.Text className="card-text mb-auto">
                Mental health is just as important as physical health, yet it
                often goes overlooked. In this article, we shed light on the
                significance of mental health awareness and destigmatization.
              </Card.Text>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg className="bi">
                  <use xlinkHref="#chevron-right"></use>
                </svg>
              </a>
            </Card.Body>
            <div className="col-auto d-none d-lg-block">
              <Card.Img
                src="https://www.voicesofyouth.org/sites/voy/files/images/2022-03/why_mental_health_awareness_is_important.png"
                alt="Thumbnail"
                width="200"
                height="250"
              />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <Card.Body className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success-emphasis">
                Health
              </strong>
              <Card.Title as="h3" className="mb-0">
                Understanding Vaccines: How Do They Work?
              </Card.Title>
              <Card.Subtitle className="mb-1 text-body-secondary">
                Nov 11
              </Card.Subtitle>
              <Card.Text className="mb-auto">
                Vaccines stimulate the body's immune system to recognize and
                combat specific pathogens, providing immunity against future
                infections. Explore how vaccines work and their role in
                preventing disease transmission within communities.
              </Card.Text>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg className="bi">
                  <use xlinkHref="#chevron-right"></use>
                </svg>
              </a>
            </Card.Body>
            <div className="col-auto d-none d-lg-block">
              <Card.Img
                src="https://th.bing.com/th/id/R.9d172bb3e60653e6da99d06966e6bb1c?rik=FSKFf8%2bvj1VZWQ&riu=http%3a%2f%2fwww.washingtonpost.com%2fblogs%2fmonkey-cage%2ffiles%2f2015%2f02%2fcrop_358bigstock-vaccination-6365007.jpg&ehk=9YZ6mSGxOL9NQ05nOlNkLa9L5qkm1dP1Hg7%2fjq7e68U%3d&risl=&pid=ImgRaw&r=0"
                alt="Thumbnail"
                width="200"
                height="250"
              />
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <Card.Body className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-secondary-emphasis">
                Nutrition
              </strong>
              <Card.Title as="h3" className="mb-0">
                Exploring Plant-Based Diets: Benefits and Considerations
              </Card.Title>
              <Card.Subtitle className="mb-1 text-body-secondary">
                April 24
              </Card.Subtitle>
              <Card.Text className="card-text mb-auto">
                Plant-based diets have gained popularity for their potential
                health benefits and environmental impact. Learn about the
                advantages of incorporating more plant-based foods into your
                diet and considerations for maintaining a balanced nutrient
                intake.
              </Card.Text>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg className="bi">
                  <use xlinkHref="#chevron-right"></use>
                </svg>
              </a>
            </Card.Body>
            <div className="col-auto d-none d-lg-block">
              <Card.Img
                src="https://th.bing.com/th/id/OIP.zoZ8wcy4H7DEmGbG-3E5ZgHaE8?rs=1&pid=ImgDetMain"
                alt="Thumbnail"
                width="200"
                height="250"
              />
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <Card.Body className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-warning-emphasis">
                Wellness
              </strong>
              <Card.Title as="h3" className="mb-0">
                The Power of Mindfulness Meditation
              </Card.Title>
              <Card.Subtitle className="mb-1 text-body-secondary">
                April 23
              </Card.Subtitle>
              <Card.Text className="card-text mb-auto">
                Mindfulness meditation has been shown to reduce stress, improve
                focus, and enhance overall well-being. Explore the benefits and
                techniques of incorporating mindfulness into your daily routine.
              </Card.Text>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg className="bi">
                  <use xlinkHref="#chevron-right"></use>
                </svg>
              </a>
            </Card.Body>
            <div className="col-auto d-none d-lg-block">
              <Card.Img
                src="https://th.bing.com/th/id/OIP.JDAfo0L0AasM4RK0lScAhAAAAA?rs=1&pid=ImgDetMain"
                alt="Thumbnail"
                width="200"
                height="250"
              />
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <Card.Body className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-info-emphasis">
                Fitness
              </strong>
              <Card.Title as="h3" className="mb-0">
                The Role of Nutrition in Fitness
              </Card.Title>
              <Card.Subtitle className="mb-1 text-body-secondary">
                April 22
              </Card.Subtitle>
              <Card.Text className="card-text mb-auto">
                Nutrition plays a crucial role in achieving fitness goals. Learn
                about the importance of balanced nutrition for fueling workouts,
                supporting muscle growth, and optimizing overall health.
              </Card.Text>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg className="bi">
                  <use xlinkHref="#chevron-right"></use>
                </svg>
              </a>
            </Card.Body>
            <div className="col-auto d-none d-lg-block">
              <Card.Img
                src="https://cabernetsports.net/wp-content/uploads/2021/06/Nutrition-fitness-800x500.jpg"
                alt="Thumbnail"
                width="200"
                height="250"
              />
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <Card.Body className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-danger-emphasis">
                Health
              </strong>
              <Card.Title as="h3" className="mb-0">
                The Benefits of Regular Exercise
              </Card.Title>
              <Card.Subtitle className="mb-1 text-body-secondary">
                April 21
              </Card.Subtitle>
              <Card.Text className="card-text mb-auto">
                Regular exercise has numerous benefits for both physical and
                mental health. Discover the advantages of incorporating regular
                physical activity into your lifestyle.
              </Card.Text>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
                <svg className="bi">
                  <use xlinkHref="#chevron-right"></use>
                </svg>
              </a>
            </Card.Body>
            <div className="col-auto d-none d-lg-block">
              <Card.Img
                src="https://ghanaeducation.org/wp-content/uploads/2021/05/exercise.jpg"
                alt="Thumbnail"
                width="200"
                height="250"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Learning;
