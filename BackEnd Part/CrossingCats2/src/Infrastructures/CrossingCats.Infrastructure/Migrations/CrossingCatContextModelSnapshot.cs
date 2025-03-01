﻿// <auto-generated />
using CrossingCats.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CrossingCats.Infrastructure.Migrations
{
    [DbContext(typeof(CrossingCatContext))]
    partial class CrossingCatContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CrossingCats.Infrastructure.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("RoomNumber")
                        .HasMaxLength(200)
                        .HasColumnType("int")
                        .IsFixedLength();

                    b.HasKey("Id");

                    b.ToTable("Game", (string)null);
                });

            modelBuilder.Entity("CrossingCats.Infrastructure.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId")
                        .IsUnique();

                    b.HasIndex("GameId");

                    b.ToTable("Player", (string)null);
                });

            modelBuilder.Entity("CrossingCats.Infrastructure.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nchar(50)")
                        .IsFixedLength();

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nchar(20)")
                        .IsFixedLength();

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<int>("TotalCarGames")
                        .HasColumnType("int");

                    b.Property<int>("TotalCatGames")
                        .HasColumnType("int");

                    b.Property<int>("TotalGames")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nchar(20)")
                        .IsFixedLength();

                    b.HasKey("Id");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("CrossingCats.Infrastructure.Models.Player", b =>
                {
                    b.HasOne("CrossingCats.Infrastructure.Models.User", "Account")
                        .WithOne("Player")
                        .HasForeignKey("CrossingCats.Infrastructure.Models.Player", "AccountId")
                        .IsRequired();

                    b.HasOne("CrossingCats.Infrastructure.Models.Game", "Game")
                        .WithMany("Players")
                        .HasForeignKey("GameId")
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Game");
                });

            modelBuilder.Entity("CrossingCats.Infrastructure.Models.Game", b =>
                {
                    b.Navigation("Players");
                });

            modelBuilder.Entity("CrossingCats.Infrastructure.Models.User", b =>
                {
                    b.Navigation("Player");
                });
#pragma warning restore 612, 618
        }
    }
}
