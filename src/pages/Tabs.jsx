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
            <h2>{selectedTab.title}</h2>
            <p>{selectedTab.description}</p>
            <ul>
              {selectedTab.content?.map((item, idx) => (
                <li key={idx}>{item.text}</li>
              ))}
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
