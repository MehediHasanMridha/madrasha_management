import { useState } from 'react';

// Presentation Component: শুধুমাত্র UI দেখাবে, সবকিছু props থেকে নেবে
const ThreeStepModalUI = ({ open, step, onClose, onNext, onPrev }) => {
    // Step অনুযায়ী কনটেন্ট
    const renderStepContent = () => {
        if (step === 1) {
            return <div>Step 1: আপনার নাম লিখুন</div>;
        }
        if (step === 2) {
            return <div>Step 2: আপনার ঠিকানা লিখুন</div>;
        }
        if (step === 3) {
            return <div>Step 3: সাবমিট করার জন্য প্রস্তুত</div>;
        }
    };

    if (!open) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 300 }}>
                {renderStepContent()}
                <div style={{ marginTop: 20 }}>
                    {step > 1 && <button onClick={onPrev}>পূর্ববর্তী</button>}
                    {step < 3 && (
                        <button onClick={onNext} style={{ marginLeft: 10 }}>
                            পরবর্তী
                        </button>
                    )}
                    {step === 3 && (
                        <button onClick={onClose} style={{ marginLeft: 10 }}>
                            শেষ করুন
                        </button>
                    )}
                </div>
                <button onClick={onClose} style={{ marginTop: 10, color: 'red' }}>
                    বন্ধ করুন
                </button>
            </div>
        </div>
    );
};

// Container Component: State ও event handler গুলো এখানে থাকবে
const ThreeStepModal = () => {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
    const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));
    const handleClose = () => {
        setOpen(false);
        setStep(1); // modal বন্ধ হলে step reset
    };

    return (
        <div>
            <button onClick={() => setOpen(true)}>Modal ওপেন করুন</button>
            <ThreeStepModalUI open={open} step={step} onClose={handleClose} onNext={handleNext} onPrev={handlePrev} />
        </div>
    );
};

export default ThreeStepModal;
