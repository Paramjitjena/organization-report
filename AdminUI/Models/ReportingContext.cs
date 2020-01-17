using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AdminUI.Models
{
    public partial class ReportingContext : DbContext
    {
        public ReportingContext()
        {
        }

        public ReportingContext(DbContextOptions<ReportingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ClassEnrollment> ClassEnrollment { get; set; }
        public virtual DbSet<Classes> Classes { get; set; }
        public virtual DbSet<ReportUsers> ReportUsers { get; set; }
        public virtual DbSet<SavedSearches> SavedSearches { get; set; }
        public virtual DbSet<TestScores> TestScores { get; set; }
        public virtual DbSet<Tests> Tests { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-KQQ6VNI\\SQLEXPRESS; Initial Catalog=Reporting; User ID=sa;Password=Mechlin_123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClassEnrollment>(entity =>
            {
                entity.HasIndex(e => e.ClassId)
                    .HasName("UserGroups44");

                entity.HasIndex(e => new { e.UserId, e.Active })
                    .HasName("idx_Composite1");

                entity.Property(e => e.ClassEnrollmentId).HasColumnName("ClassEnrollmentID");

                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('Y')");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<Classes>(entity =>
            {
                entity.HasKey(e => e.ClassId)
                    .HasName("PK_Groups");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('Y')");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ReportUsers>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_Users");

                entity.HasIndex(e => e.Active)
                    .HasName("Users46");

                entity.HasIndex(e => new { e.Active, e.UserId, e.EmployeeId })
                    .HasName("Users43");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeId)
                    .HasColumnName("EmployeeID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EthnicId).HasColumnName("EthnicID");

                entity.Property(e => e.Fname)
                    .HasColumnName("FName")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Lname)
                    .HasColumnName("LName")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SavedSearches>(entity =>
            {
                entity.HasKey(e => e.SearchId);

                entity.Property(e => e.SearchId).HasColumnName("searchId");

                entity.Property(e => e.Field)
                    .HasColumnName("field")
                    .HasMaxLength(50);

                entity.Property(e => e.IsPublic).HasColumnName("isPublic");

                entity.Property(e => e.Logic)
                    .HasColumnName("logic")
                    .HasMaxLength(50);

                entity.Property(e => e.Operator1)
                    .HasColumnName("operator1")
                    .HasMaxLength(50);

                entity.Property(e => e.Operator2)
                    .HasColumnName("operator2")
                    .HasMaxLength(50);

                entity.Property(e => e.Searchname)
                    .IsRequired()
                    .HasColumnName("searchname")
                    .HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.Value1).HasColumnName("value1");

                entity.Property(e => e.Value2).HasColumnName("value2");
            });

            modelBuilder.Entity<TestScores>(entity =>
            {
                entity.HasKey(e => e.TestScoreId)
                    .HasName("PK_UserTestSessions");

                entity.HasIndex(e => new { e.TestId, e.NoShow })
                    .HasName("UserTestSessions19");

                entity.HasIndex(e => new { e.TestId, e.NoShow, e.UserId })
                    .HasName("UserTestSessions34");

                entity.HasIndex(e => new { e.UserId, e.TestId, e.NoShow })
                    .HasName("UserTestSessions13");

                entity.HasIndex(e => new { e.UserId, e.TestId, e.NoShow, e.Active })
                    .HasName("UserTestSessions35");

                entity.Property(e => e.TestScoreId).HasColumnName("TestScoreID");

                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('Y')");

                entity.Property(e => e.DateSubmitted).HasColumnType("datetime");

                entity.Property(e => e.NoShow)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.TestId).HasColumnName("TestID");

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<Tests>(entity =>
            {
                entity.HasKey(e => e.TestId)
                    .HasName("PK_TestSessions");

                entity.Property(e => e.TestId).HasColumnName("TestID");

                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('Y')");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SessionEndDate).HasColumnType("datetime");

                entity.Property(e => e.SessionStartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_Users_2");

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
