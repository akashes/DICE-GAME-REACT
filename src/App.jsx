import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./Dice";
import { useRef } from "react";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
function App() {
  let newGameRef = useRef(null);
  const [isDisabled,setIsDisabled]=useState(false)

  const { width, height } = useWindowSize();

  const [dice, setDice] = useState(() => generateNewSetOfDices());

  //local variable stores win status
  const isGameWon =
    dice.every((d) => d.selected) &&
    dice.every((d) => d.value === dice[0].value);

  function generateNewSetOfDices() {
    console.log("generateNewSetOfDices");
    const dices = [];
    for (let i = 0; i < 10; i++) {
      const randNumber = Math.floor(Math.random() * 6) + 1;
      let newEntry = { id: i + 1, value: randNumber, selected: false };
      dices.push(newEntry);
    }
    return dices;
  }

  const rollDice = () => {
    if (isGameWon) {
      setDice(generateNewSetOfDices());
      return;
    }

  

    setDice((prevDice) => {
      return prevDice.map((d) => {
        return d.selected != true
          ? { ...d, value: Math.floor(Math.random() * 6) + 1 }
          : d;
      });
    });
  };

  const selectDice = (id) => {
    //check for same value
    let newSelected;
    let check = true;
    dice.forEach((d) => {
      if (d.id === id) {
        newSelected = d.value;
      }
    });

    dice.map((d) => {
      if (d.selected === true) {
     
        if (d.value != newSelected) {
          // abort from select dice function
          check = false;
        }
      }
    });

    if (check) {
      const newValue = dice.map((d) => {
        if (id === d.id) {
          if (d.selected === true) {
            d.selected = false;
          } else {
            d.selected = true;
          }
        }
        return d;
        // return d.id===id ? {...d,selected:!d.selected}:d
      });
      setDice(newValue);
    }

  };
  useEffect(() => {
    if(isGameWon){

      setIsDisabled(true)
      newGameRef.current?.focus()

      const timer = setTimeout(() => {
        setIsDisabled(false); //
      }, 4000);

      return () => clearTimeout(timer); 
    }

  }, [isGameWon]);
  return (
    <main>

      {/* confetti decoration */}
      {isGameWon && <Confetti width={width} height={height} />}

      {/* screen reader only */}
      <div aria-live="polite" className="sr-only">
        {isGameWon && (
          <p>Congratulations! You Won!. Press new game to play again</p>
        )}
      </div>

      <h1 className="text-6xl font-semibold text-center my-8">Tenzies</h1>

      <p className="text-center text-xl font-semibold mb-4">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>

      <div className="dice-container">
        {dice.map((item, index) => {
          return (
            <Dice
              isWon={isGameWon}
              selectDice={() => selectDice(item.id)}
              key={index}
              item={item}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-4">
     

        <button
        disabled={isDisabled}
          ref={newGameRef}
          onClick={rollDice}
          className=" bg-purple-600 text-white rounded-lg   px-3 py-2  shadow-xl bg-gray-100 font-bold "
        >
          {isGameWon ? "Start New Game" : "Roll Dice"}
        </button>
      </div>
    </main>
  );
}

export default App;
