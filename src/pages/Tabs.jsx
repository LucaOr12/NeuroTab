import { useEffect, useState } from "react";
import AnimatedList from "../components/AnimatedList";
import "./Tabs.scss";

export default function Tabs() {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTabs = tabs.filter((tab) =>
    tab.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch("https://neurotab-api.onrender.com/api/Tabs/all", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setTabs(data);
        if (data.length > 0) setSelectedTab(data[0]);
      });
  }, []);

  const handleCreateTab = async () => {
    const newTab = {
      title: "Untitled Tab",
      content: [],
      url: null,
      description: "",
      tags: [],
    };

    const response = await fetch("https://neurotab-api.onrender.com/api/Tabs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTab),
    });

    if (response.ok) {
      const createdTab = await response.json();
      setTabs([...tabs, createdTab]);
      setSelectedTab(createdTab);
    } else {
      alert("Failed to create tab");
    }
  };

  const selectedIndex = filteredTabs.findIndex(
    (tab) => tab.id === selectedTab?.id
  );

  const handleCreateContent = async (tabId) => {
    console.log("Creating content for tabId:", tabId);
    const response = await fetch(
      `https://neurotab-api.onrender.com/api/Contents`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tabId: tabId,
          title: "New Content Item",
          description: "",
          url: null,
        }),
      }
    );
    if (response.ok) {
      const newContent = await response.json();
      console.log("Created Content:", newContent);
      // Update the selected tab with the new content
      setSelectedTab((prevTab) => {
        if (!prevTab) return null;
        return {
          ...prevTab,
          content: [...(prevTab.content || []), newContent],
        };
      });
    } else {
      const error = await response.json();
      console.error("Error creating content:", error);
    }
  };

  return (
    <div className="tabs-page">
      <aside className="tab-nav">
        <input
          type="text"
          placeholder="Search tabs..."
          className="tab-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleCreateTab} className="create-tab-button">
          +
        </button>

        {filteredTabs.length === 0 ? (
          <div className="no-tabs">
            <p>No tabs found.</p>
          </div>
        ) : (
          <AnimatedList
            items={filteredTabs.map((tab) => tab.title)}
            onItemSelect={(title, index) => {
              setSelectedTab(filteredTabs[index]);
            }}
            showGradients={false}
            enableArrowNavigation={true}
            displayScrollbar={false}
            selectedIndex={filteredTabs.findIndex(
              (tab) => tab.id === selectedTab?.id
            )}
          />
        )}
      </aside>

      <main className="tab-content">
        {selectedTab ? (
          <>
            <div className="tab-actions">
              <h2>{selectedTab.title}</h2>
              <p>{selectedTab.description}</p>
              <button
                className="create-content-button"
                onClick={() => handleCreateContent(selectedTab.id)}
              >
                Create Thought +
              </button>
            </div>
            <ul className="tab-items">
              {selectedTab.content?.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  )}
                </li>
              ))}
              {selectedTab.content?.length === 0 && (
                <li
                  className="no-content"
                  style={{
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  No content created yet.
                </li>
              )}
            </ul>
          </>
        ) : (
          <div className="no-tab-selected">
            <p>Please select a tab to view its content.</p>
          </div>
        )}
      </main>
    </div>
  );
}
