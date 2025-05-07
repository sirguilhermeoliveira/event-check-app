import React from 'react';

export const EventSummary = ({ checkedInCount, notCheckedInCount, companyBreakdown }) => (
    <div className="mt-4 p-4 border rounded">
      <h2 className="font-bold text-lg mb-4">Event Summary</h2>
      <div className="flex flex-row">
    <div className="flex flex-row">
      <div className="font-bold">✅ Checked-in: </div><p>{checkedInCount}</p>
    </div>
    <div className="flex flex-row">
      <div className="font-bold">🚫 Not checked-in yet: </div><p> {notCheckedInCount}</p>
      </div>
      </div>
      {checkedInCount > 0 && (
        <div>
          <p className="font-bold">🏢 Checked-in by company:</p>
          <ul>
            {Object.entries(companyBreakdown).map(([company, count]) => (
              <li key={company}>
                ⭐ {company}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );