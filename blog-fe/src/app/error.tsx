"use client"

interface ErrorProps {
    error: Error;
    reset: () => void;
  }

export default function Error({error, reset}: ErrorProps){
    return(
        <div>
            An error has occured: {error.message}
            <button onClick={reset}>Try again</button>
        </div>
    )
}