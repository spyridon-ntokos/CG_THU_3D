﻿/** 
 * Copyright (C) 2018 Tomasz Gałaj
 **/

#pragma once
#include <string>
#include <iostream>
#include <glad/glad.h>

class Texture
{
public:
    Texture(int id=0);
    ~Texture();

    bool load(const std::string & file_name);
    
    void bind(int index = 0) const
    {
        if(to_id != 0)
        {
            glActiveTexture(GL_TEXTURE0 + index);
            glBindTexture(GL_TEXTURE_2D, to_id);
            //std::cout << to_id << std::endl;
        }
    }

    bool use_linear;

private:
    GLuint to_id;
};
