package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ind04Classif.
 */
@Entity
@Table(name = "ind_04_classif")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ind04Classif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 400)
    @Column(name = "dl_des", length = 400, nullable = false)
    private String dlDes;

    @NotNull
    @Size(max = 100)
    @Column(name = "db_cod", length = 100, nullable = false)
    private String dbCod;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDlDes() {
        return dlDes;
    }

    public Ind04Classif dlDes(String dlDes) {
        this.dlDes = dlDes;
        return this;
    }

    public void setDlDes(String dlDes) {
        this.dlDes = dlDes;
    }

    public String getDbCod() {
        return dbCod;
    }

    public Ind04Classif dbCod(String dbCod) {
        this.dbCod = dbCod;
        return this;
    }

    public void setDbCod(String dbCod) {
        this.dbCod = dbCod;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ind04Classif ind04Classif = (Ind04Classif) o;
        if (ind04Classif.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ind04Classif.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ind04Classif{" +
            "id=" + getId() +
            ", dlDes='" + getDlDes() + "'" +
            ", dbCod='" + getDbCod() + "'" +
            "}";
    }
}
