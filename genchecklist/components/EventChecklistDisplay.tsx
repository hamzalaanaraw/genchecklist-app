
import React from 'react';
import { AppEventChecklist } from '../types';

interface EventChecklistDisplayProps {
  checklist: AppEventChecklist;
  onToggleTaskCompleted: (sectionName: string, taskId: string) => void;
}

const EventChecklistDisplay: React.FC<EventChecklistDisplayProps> = ({ checklist, onToggleTaskCompleted }) => {
  if (!checklist || checklist.length === 0) {
    return <p className="text-center text-slate-400 text-lg">No event plan items to display. Try generating a new plan!</p>;
  }

  return (
    <div className="space-y-8">
      {checklist.map((section) => (
        <div key={section.sectionName} className="bg-slate-800 shadow-xl rounded-lg p-6" role="region" aria-labelledby={`section-title-${section.sectionName.replace(/\s+/g, '-').toLowerCase()}`}>
          <h3 
            id={`section-title-${section.sectionName.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-2xl font-semibold text-fuchsia-500 mb-5 border-b-2 border-slate-700 pb-2"
          >
            {section.sectionName}
          </h3>
          {section.tasks.length > 0 ? (
            <ul className="space-y-3" role="list">
              {section.tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-start p-3 rounded-md transition-all duration-200 ease-in-out ${
                    task.completed ? 'bg-fuchsia-800/30 text-slate-500' : 'bg-slate-700/70 hover:bg-slate-600/70'
                  }`}
                  role="listitem"
                >
                  <input
                    type="checkbox"
                    id={`event-task-${task.id}`}
                    checked={task.completed}
                    onChange={() => onToggleTaskCompleted(section.sectionName, task.id)}
                    className="h-5 w-5 rounded border-slate-500 text-fuchsia-500 focus:ring-fuchsia-400 focus:ring-offset-slate-800 mr-4 mt-1 flex-shrink-0 accent-fuchsia-500 cursor-pointer"
                    aria-labelledby={`event-task-label-${task.id}`}
                  />
                  <label htmlFor={`event-task-${task.id}`} className="flex-grow cursor-pointer">
                    <span 
                      id={`event-task-label-${task.id}`}
                      className={`font-medium ${task.completed ? 'line-through' : 'text-slate-100'}`}
                    >
                      {task.taskName}
                    </span>
                    {task.suggestedTimeline && (
                      <p className={`text-xs mt-1 font-semibold ${task.completed ? 'text-slate-600' : 'text-purple-400'}`}>
                        Timeline: {task.suggestedTimeline}
                      </p>
                    )}
                    {task.notes && (
                      <p className={`text-xs mt-1 ${task.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                        <strong>Notes:</strong> {task.notes}
                      </p>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No tasks currently in this section.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventChecklistDisplay;
