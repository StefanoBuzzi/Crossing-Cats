﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace CrossingCats.Infrastructure.Models;

public partial class Game
{
    public int Id { get; set; }

    public int RoomNumber { get; set; }

    public virtual ICollection<Player> Players { get; set; } = new List<Player>();
}