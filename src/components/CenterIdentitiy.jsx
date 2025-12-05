// src/components/CenterIdentity.jsx
export default function CenterIdentity() {
  return (
    <div className="center-id">
      <div className="center-id__kicker">ARTIFICIAL</div>

      <div className="center-id__row">
        {/* Header’daki ile %100 aynı yapı */}
        <div className="lusai-pro">
          <span className="lus-lus">
            <span className="ch k-L">L</span>
            <span className="ch k-U">U</span>
            <span className="ch s k-S">S</span>
          </span>
          <span className="ch ai k-A">A</span>
          <span className="ch ai k-nudge-up">I</span>
        </div>

        {/* Yanında büyük “AI” */}
        <span className="ai-big">AI</span>
      </div>

      <div className="center-id__kicker">INTELLIGENCE</div>
    </div>
  );
}
