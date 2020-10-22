import Button from "@material-ui/core/Button";
import Collectibles from "./Collectibles";
import React from "react";
import Rules from "./Rules";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Tokens from "./Tokens";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepCompleted: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return [
    "Choose your set of collectibles",
    "Choose your set of tokens",
    "Choose your set of rules",
  ];
}

function getStepContent(setStepCompleted, stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Collectibles setStepCompleted={setStepCompleted} />;
    case 1:
      return <Tokens setStepCompleted={setStepCompleted} />;
    case 2:
      return <Rules setStepCompleted={setStepCompleted} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function NewGame() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepCompleted, setSetCompleted] = React.useState(false);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container direction="column" justify="center" alignItems="center">
        {activeStep === steps.length ? (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.instructions} component="span">
              Congrats! You've created your NFT game. We will create a smart
              contract for each part of the flow.
            </Typography>
            <Button href="https://etherscan.io/" target="_blank">
              Show on Blockchain
            </Button>
          </Grid>
        ) : (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.instructions} component="span">
              {getStepContent(setSetCompleted, activeStep)}
            </Typography>
            {stepCompleted && (
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
