import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [savedTexts, setSavedTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSavedTexts();
  }, []);

  const loadSavedTexts = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        action: "getSavedTexts",
      });
      setSavedTexts(response.savedTexts || []);
    } catch (error) {
      console.error("Error loading saved texts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteText = async (id) => {
    try {
      await chrome.runtime.sendMessage({ action: "deleteText", id });
      setSavedTexts((prev) => prev.filter((text) => text.id !== id));
    } catch (error) {
      console.error("Error deleting text:", error);
    }
  };

  const clearAllTexts = async () => {
    if (confirm("Are you sure you want to clear all saved texts?")) {
      try {
        await chrome.runtime.sendMessage({ action: "clearAllTexts" });
        setSavedTexts([]);
      } catch (error) {
        console.error("Error clearing texts:", error);
      }
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const filteredTexts = savedTexts.filter(
    (text) =>
      text.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div>Loading saved texts...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "16px",
        minHeight: "400px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: "18px",
            color: "#333",
            textAlign: "center",
          }}
        >
          Text Saver
        </h2>

        <input
          type="text"
          placeholder="Search saved texts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px", textAlign: "center" }}>
        <button
          onClick={clearAllTexts}
          disabled={savedTexts.length === 0}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: savedTexts.length === 0 ? "not-allowed" : "pointer",
            opacity: savedTexts.length === 0 ? 0.6 : 1,
          }}
        >
          Clear All ({savedTexts.length})
        </button>
      </div>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "white",
        }}
      >
        {filteredTexts.length === 0 ? (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            {savedTexts.length === 0
              ? "No saved texts yet. Right-click on selected text to save!"
              : "No texts match your search."}
          </div>
        ) : (
          filteredTexts.map((text) => (
            <div
              key={text.id}
              style={{
                padding: "12px",
                borderBottom: "1px solid #eee",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  lineHeight: "1.4",
                  marginBottom: "8px",
                  color: "#333",
                }}
              >
                {truncateText(text.text, 120)}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#666",
                  marginBottom: "8px",
                }}
              >
                <div>{text.domain}</div>
                <div>{formatDate(text.timestamp)}</div>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => copyToClipboard(text.text)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Copy
                </button>

                <button
                  onClick={() => deleteText(text.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          marginTop: "12px",
          fontSize: "11px",
          color: "#666",
          textAlign: "center",
        }}
      >
        Right-click selected text to save • Ctrl+Shift+S shortcut
      </div>
    </div>
  );
};

// Initialize React app
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Popup />);
