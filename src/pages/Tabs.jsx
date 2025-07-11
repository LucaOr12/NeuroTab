import { useEffect, useState } from "react";
import AnimatedList from "../components/AnimatedList";
import TabFlow from "../components/TabFlow";
import CreateTabDialog from "../components/CreateTabDialog";
import CreateContentDialog from "../components/CreateContentDialog";
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

  const handleCreateTab = async ({ title, description }) => {
    const newTab = {
      title: title || "Untitled Tab",
      content: [],
      url: null,
      description: description || "",
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
        <CreateTabDialog onCreate={handleCreateTab} />

        {filteredTabs.length === 0 ? (
          <div className="no-tabs">
            <p>No tabs found.</p>
          </div>
        ) : (
          <AnimatedList
            items={filteredTabs}
            onItemSelect={(tab) => {
              setSelectedTab(tab);
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
              <CreateContentDialog
                onCreate={() => handleCreateContent(selectedTab.id)}
              />
            </div>
            <TabFlow contents={selectedTab.content || []} />
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
