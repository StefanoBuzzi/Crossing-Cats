﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace CrossingCats.Domains.Models;

public class GameDto
{
    public int Id { get; set; }

    public int RoomNumber { get; set; }

    public  IEnumerable<PlayerDto> Players { get; set; } = new List<PlayerDto>();
}