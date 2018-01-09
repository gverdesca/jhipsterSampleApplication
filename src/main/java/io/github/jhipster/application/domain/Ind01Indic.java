package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ind01Indic.
 */
@Entity
@Table(name = "ind_01_indic")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ind01Indic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 400)
    @Column(name = "dl_des", length = 400)
    private String dlDes;

    @NotNull
    @Size(max = 500)
    @Column(name = "lt_note", length = 500, nullable = false)
    private String ltNote;

    @NotNull
    @Size(max = 400)
    @Column(name = "dl_path_owl", length = 400, nullable = false)
    private String dlPathOwl;

    @NotNull
    @Size(max = 400)
    @Column(name = "dl_iri", length = 400, nullable = false)
    private String dlIri;

    @NotNull
    @Size(max = 100)
    @Column(name = "db_cod", length = 100, nullable = false)
    private String dbCod;

    @ManyToOne
    private Ind02Std ind02Std;

    @ManyToOne
    private Ind04Classif ind04classif;

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

    public Ind01Indic dlDes(String dlDes) {
        this.dlDes = dlDes;
        return this;
    }

    public void setDlDes(String dlDes) {
        this.dlDes = dlDes;
    }

    public String getLtNote() {
        return ltNote;
    }

    public Ind01Indic ltNote(String ltNote) {
        this.ltNote = ltNote;
        return this;
    }

    public void setLtNote(String ltNote) {
        this.ltNote = ltNote;
    }

    public String getDlPathOwl() {
        return dlPathOwl;
    }

    public Ind01Indic dlPathOwl(String dlPathOwl) {
        this.dlPathOwl = dlPathOwl;
        return this;
    }

    public void setDlPathOwl(String dlPathOwl) {
        this.dlPathOwl = dlPathOwl;
    }

    public String getDlIri() {
        return dlIri;
    }

    public Ind01Indic dlIri(String dlIri) {
        this.dlIri = dlIri;
        return this;
    }

    public void setDlIri(String dlIri) {
        this.dlIri = dlIri;
    }

    public String getDbCod() {
        return dbCod;
    }

    public Ind01Indic dbCod(String dbCod) {
        this.dbCod = dbCod;
        return this;
    }

    public void setDbCod(String dbCod) {
        this.dbCod = dbCod;
    }

    public Ind02Std getInd02Std() {
        return ind02Std;
    }

    public Ind01Indic ind02Std(Ind02Std ind02Std) {
        this.ind02Std = ind02Std;
        return this;
    }

    public void setInd02Std(Ind02Std ind02Std) {
        this.ind02Std = ind02Std;
    }

    public Ind04Classif getInd04classif() {
        return ind04classif;
    }

    public Ind01Indic ind04classif(Ind04Classif ind04Classif) {
        this.ind04classif = ind04Classif;
        return this;
    }

    public void setInd04classif(Ind04Classif ind04Classif) {
        this.ind04classif = ind04Classif;
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
        Ind01Indic ind01Indic = (Ind01Indic) o;
        if (ind01Indic.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ind01Indic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ind01Indic{" +
            "id=" + getId() +
            ", dlDes='" + getDlDes() + "'" +
            ", ltNote='" + getLtNote() + "'" +
            ", dlPathOwl='" + getDlPathOwl() + "'" +
            ", dlIri='" + getDlIri() + "'" +
            ", dbCod='" + getDbCod() + "'" +
            "}";
    }
}
