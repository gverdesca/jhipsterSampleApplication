package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Datasource.
 */
@Entity
@Table(name = "datasource")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Datasource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "db_tipo", length = 100)
    private String dbTipo;

    @NotNull
    @Size(max = 400)
    @Column(name = "cd_cod", length = 400, nullable = false)
    private String cdCod;

    @Column(name = "ts_creaz")
    private LocalDate tsCreaz;

    @Column(name = "ts_modif")
    private LocalDate tsModif;

    @Size(max = 400)
    @Column(name = "dl_path_img", length = 400)
    private String dlPathImg;

    @OneToMany(mappedBy = "datasource")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ind12Query> queries = new HashSet<>();

    @ManyToOne
    private Ba01Utente user;

    @ManyToOne
    private Ba01Utente userUpdate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDbTipo() {
        return dbTipo;
    }

    public Datasource dbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
        return this;
    }

    public void setDbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
    }

    public String getCdCod() {
        return cdCod;
    }

    public Datasource cdCod(String cdCod) {
        this.cdCod = cdCod;
        return this;
    }

    public void setCdCod(String cdCod) {
        this.cdCod = cdCod;
    }

    public LocalDate getTsCreaz() {
        return tsCreaz;
    }

    public Datasource tsCreaz(LocalDate tsCreaz) {
        this.tsCreaz = tsCreaz;
        return this;
    }

    public void setTsCreaz(LocalDate tsCreaz) {
        this.tsCreaz = tsCreaz;
    }

    public LocalDate getTsModif() {
        return tsModif;
    }

    public Datasource tsModif(LocalDate tsModif) {
        this.tsModif = tsModif;
        return this;
    }

    public void setTsModif(LocalDate tsModif) {
        this.tsModif = tsModif;
    }

    public String getDlPathImg() {
        return dlPathImg;
    }

    public Datasource dlPathImg(String dlPathImg) {
        this.dlPathImg = dlPathImg;
        return this;
    }

    public void setDlPathImg(String dlPathImg) {
        this.dlPathImg = dlPathImg;
    }

    public Set<Ind12Query> getQueries() {
        return queries;
    }

    public Datasource queries(Set<Ind12Query> ind12Queries) {
        this.queries = ind12Queries;
        return this;
    }

    public Datasource addQueries(Ind12Query ind12Query) {
        this.queries.add(ind12Query);
        ind12Query.setDatasource(this);
        return this;
    }

    public Datasource removeQueries(Ind12Query ind12Query) {
        this.queries.remove(ind12Query);
        ind12Query.setDatasource(null);
        return this;
    }

    public void setQueries(Set<Ind12Query> ind12Queries) {
        this.queries = ind12Queries;
    }

    public Ba01Utente getUser() {
        return user;
    }

    public Datasource user(Ba01Utente ba01Utente) {
        this.user = ba01Utente;
        return this;
    }

    public void setUser(Ba01Utente ba01Utente) {
        this.user = ba01Utente;
    }

    public Ba01Utente getUserUpdate() {
        return userUpdate;
    }

    public Datasource userUpdate(Ba01Utente ba01Utente) {
        this.userUpdate = ba01Utente;
        return this;
    }

    public void setUserUpdate(Ba01Utente ba01Utente) {
        this.userUpdate = ba01Utente;
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
        Datasource datasource = (Datasource) o;
        if (datasource.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), datasource.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Datasource{" +
            "id=" + getId() +
            ", dbTipo='" + getDbTipo() + "'" +
            ", cdCod='" + getCdCod() + "'" +
            ", tsCreaz='" + getTsCreaz() + "'" +
            ", tsModif='" + getTsModif() + "'" +
            ", dlPathImg='" + getDlPathImg() + "'" +
            "}";
    }
}
