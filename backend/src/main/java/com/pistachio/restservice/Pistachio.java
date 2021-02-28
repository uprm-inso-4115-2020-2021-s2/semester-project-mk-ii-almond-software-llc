package com.pistachio.restservice;

public class Pistachio {

    private final long id;
    private final String content;

    public Pistachio(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

}
