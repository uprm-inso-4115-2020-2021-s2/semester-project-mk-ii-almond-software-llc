package com.pistachio.main;

import org.springframework.data.annotation.Id;

public class Task
{
    private String Name;
    private String Description;
    private int Reward;
    private String CompletionCriteria;
    @Id
    private String _ID;

    public Task()
    {
        _ID = "";
        Name = "";
        Description = "";
        Reward = 0;
        CompletionCriteria = "";
    }

    public Task(String name, String description, int amount, String CompletionCriteria)
    {
        Name = name;
        Description = description;
        Reward = amount;
        this.CompletionCriteria = CompletionCriteria;
    }

    /**
     * @return the name
     */
    public String getName() {
        return Name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        Name = name;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return Description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        Description = description;
    }

    /**
     * @return the reward
     */
    public int getReward() {
        return Reward;
    }

    /**
     * @param reward the reward to set
     */
    public void setReward(int reward) {
        Reward = reward;
    }

    /**
     * @return the completionCriteria
     */
    public String getCompletionCriteria() {
        return CompletionCriteria;
    }

    /**
     * @param completionCriteria the completionCriteria to set
     */
    public void setCompletionCriteria(String completionCriteria) {
        CompletionCriteria = completionCriteria;
    }

    /**
     * @return the _ID
     */
    public String get_ID() {
        return _ID;
    }

    /**
     * @param _ID the _ID to set
     */
    public void set_ID(String _ID) {
        this._ID = _ID;
    }

    @Override
	public boolean equals(Object obj) {
		if (this == obj) {return true;}
		if (!(obj instanceof Task)) {return false;}
		Task other = (Task) obj;
		return _ID.contentEquals(other._ID);
	}
    
    @Override
	public String toString() {return "Task [Name=" + Name + "]";}
}