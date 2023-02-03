import './styles.scss';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';

import Img404 from '../../assets/error404.png';
import ImgHeart from '../../assets/hearts.png';
import Dialog from '../../components/Dialog/Dialog';

interface Props {
  isLoaded: boolean;
}

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const Page404: React.FC<Props> = ({ isLoaded }) => {
  const [counter, setCounter] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  const [dialogIndex, setDialogIndex] = useState(0);
  const [cancelCounter, setCancelCounter] = useState(0);
  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const throwError = () => {
    const dialog = document.querySelector(".dialogue");
    if (dialog) {
      dialog.classList.add("dialogue--error");
      setTimeout(() => {
        dialog.classList.remove("dialogue--error");
      }, 1000);
    }
  };

  const dialogOptions = [
    {
      title: "You have been hacked! LOL :)",
      message: "There is no going back now. You are doomed!",
      onConfirm: () => {
        setDialogIndex(1);
      },
    },
    {
      title: "However I still have a question for you...",
      onConfirm: () => {
        setDialogIndex(2);
      },
    },
    {
      title: "Will you be my valentine?",
      onConfirm: () => {
        // Confirm
        setDialogIndex(4);
        fire();
      },
      onCancel: () => {
        setDialogIndex(3);
      },
    },
    {
      title: "Please!!!!",
      onConfirm: () => {
        // Confirm
        setDialogIndex(4);
        fire();
      },
      onCancel: () => {
        // Throw error
        throwError();
        setCancelCounter((prev) => prev + 1);
      },
    },
    {
      title: "Yaay! I love you too!",
      message: "Happy Valentine's Day!",
      onConfirm: () => {
        // Confirm
        fire();
      },
      confirmText: "Awwww",
    },
    {
      title: "Fuck you!",
      message: "You'll still be my valentine! SO CLICK OKAY!",
      onConfirm: () => {
        // Confirm
        setDialogIndex(4);
        fire();
      },
    },
  ];

  useEffect(() => {
    if (isLoaded && !interval.current) {
      interval.current = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [isLoaded]);

  useEffect(() => {
    if (interval.current) {
      if (counter === 5) {
        clearInterval(interval.current);
      }
    }
  }, [counter]);

  useEffect(() => {
    if (cancelCounter > 3) {
      setDialogIndex(5);
    }
  }, [cancelCounter]);

  return (
    <div className="Page404">
      {dialogIndex === 4 ? (
        <img src={ImgHeart} alt="404" className="Page404__heartimg" />
      ) : (
        <img src={Img404} alt="404" />
      )}
      {isLoaded && (
        <div className="Page404__text">
          {counter < 5 ? (
            <h1>{counter}</h1>
          ) : (
            <Dialog {...dialogOptions[dialogIndex]} />
          )}
          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
      )}
    </div>
  );
};

export default Page404;
